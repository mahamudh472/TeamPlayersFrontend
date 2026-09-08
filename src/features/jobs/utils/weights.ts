import { JobPriorityWeights } from "../types";

export const DEFAULT_WEIGHTS: JobPriorityWeights = {
    skills_weight: 20.0,
    experience_weight: 20.0,
    salary_weight: 20.0,
    location_weight: 20.0,
    certification_weight: 20.0,
};

export const WEIGHT_KEYS: (keyof JobPriorityWeights)[] = [
    "skills_weight",
    "experience_weight",
    "salary_weight",
    "location_weight",
    "certification_weight",
];

/**
 * Calculates the sum of all 5 weights rounded to 1 decimal place.
 */
export function calculateTotalWeightSum(weights: JobPriorityWeights): number {
    return (
        Math.round(
            (weights.skills_weight +
                weights.experience_weight +
                weights.salary_weight +
                weights.location_weight +
                weights.certification_weight) *
                10
        ) / 10
    );
}

/**
 * Proportionally adjusts the other 4 weights when one weight is modified,
 * ensuring the sum of all 5 fields is always equal to 100.0%.
 */
export function adjustWeightsWithFixedSum(
    currentWeights: JobPriorityWeights,
    changedKey: keyof JobPriorityWeights,
    requestedVal: number
): JobPriorityWeights {
    const clampedNewVal = Math.max(0, Math.min(100, Math.round(requestedVal * 10) / 10));
    const otherKeys = WEIGHT_KEYS.filter((k) => k !== changedKey);
    const remainingBudget = Math.round((100 - clampedNewVal) * 10) / 10;

    const result: JobPriorityWeights = {
        ...currentWeights,
        [changedKey]: clampedNewVal,
    };

    if (remainingBudget <= 0) {
        otherKeys.forEach((k) => {
            result[k] = 0;
        });
        return result;
    }

    const currentOtherSum = otherKeys.reduce((acc, k) => acc + (currentWeights[k] || 0), 0);

    if (currentOtherSum <= 0) {
        // Distribute remainingBudget equally among others
        const share = Math.round((remainingBudget / otherKeys.length) * 10) / 10;
        let allocated = 0;
        for (let i = 0; i < otherKeys.length - 1; i++) {
            result[otherKeys[i]] = share;
            allocated += share;
        }
        result[otherKeys[otherKeys.length - 1]] = Math.max(
            0,
            Math.round((remainingBudget - allocated) * 10) / 10
        );
        return result;
    }

    // Proportional scaling for other keys
    let remainingToDistribute = remainingBudget;
    let eligibleKeys = [...otherKeys];
    const tempWeights: Record<string, number> = {};
    otherKeys.forEach((k) => {
        tempWeights[k] = currentWeights[k] || 0;
    });

    while (eligibleKeys.length > 0) {
        const eligibleSum = eligibleKeys.reduce((sum, k) => sum + tempWeights[k], 0);

        if (eligibleSum <= 0) {
            const share = Math.round((remainingToDistribute / eligibleKeys.length) * 10) / 10;
            let allocated = 0;
            for (let i = 0; i < eligibleKeys.length - 1; i++) {
                result[eligibleKeys[i]] = share;
                allocated += share;
            }
            result[eligibleKeys[eligibleKeys.length - 1]] = Math.max(
                0,
                Math.round((remainingToDistribute - allocated) * 10) / 10
            );
            break;
        }

        let hasClamped = false;
        const newEligibleKeys: (keyof JobPriorityWeights)[] = [];

        for (const k of eligibleKeys) {
            const prop = (tempWeights[k] / eligibleSum) * remainingToDistribute;
            const rounded = Math.round(prop * 10) / 10;
            if (rounded < 0) {
                result[k] = 0;
                hasClamped = true;
            } else {
                result[k] = rounded;
                newEligibleKeys.push(k);
            }
        }

        if (!hasClamped) {
            // Reconcile minor rounding difference on the last eligible key
            const allocatedOthers = otherKeys.reduce((acc, k) => acc + (result[k] || 0), 0);
            const diff = Math.round((remainingBudget - allocatedOthers) * 10) / 10;
            if (diff !== 0 && eligibleKeys.length > 0) {
                const lastKey = eligibleKeys[eligibleKeys.length - 1];
                result[lastKey] = Math.max(0, Math.round((result[lastKey] + diff) * 10) / 10);
            }
            break;
        }

        const allocatedFixed = otherKeys
            .filter((k) => !newEligibleKeys.includes(k))
            .reduce((sum, k) => sum + result[k], 0);
        remainingToDistribute = Math.max(0, Math.round((remainingBudget - allocatedFixed) * 10) / 10);
        eligibleKeys = newEligibleKeys;
    }

    // Final sanity reconciliation to ensure strict 100.0 sum
    const totalAllocated =
        result.skills_weight +
        result.experience_weight +
        result.salary_weight +
        result.location_weight +
        result.certification_weight;
    const finalDiff = Math.round((100 - totalAllocated) * 10) / 10;

    if (finalDiff !== 0) {
        // Adjust the largest other key
        let targetKey = otherKeys[0];
        let maxVal = -1;
        for (const k of otherKeys) {
            if (result[k] > maxVal) {
                maxVal = result[k];
                targetKey = k;
            }
        }
        result[targetKey] = Math.max(0, Math.round((result[targetKey] + finalDiff) * 10) / 10);
    }

    return result;
}

/**
 * Scales any arbitrary weights to sum exactly to 100.0%.
 */
export function normalizeWeightsTo100(weights: JobPriorityWeights): JobPriorityWeights {
    const sum = calculateTotalWeightSum(weights);
    if (sum === 0) return { ...DEFAULT_WEIGHTS };

    const factor = 100 / sum;
    const normalized: JobPriorityWeights = {
        skills_weight: Math.round(weights.skills_weight * factor * 10) / 10,
        experience_weight: Math.round(weights.experience_weight * factor * 10) / 10,
        salary_weight: Math.round(weights.salary_weight * factor * 10) / 10,
        location_weight: Math.round(weights.location_weight * factor * 10) / 10,
        certification_weight: 0,
    };

    const partialSum =
        normalized.skills_weight +
        normalized.experience_weight +
        normalized.salary_weight +
        normalized.location_weight;
    normalized.certification_weight = Math.max(0, Math.round((100 - partialSum) * 10) / 10);

    return normalized;
}
