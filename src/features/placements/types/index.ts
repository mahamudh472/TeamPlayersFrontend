export interface PlacementItem {
    id: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    position: string;
    client: string;
    salary: string;
    fee: string;
    placedDate: string;
    status: "Started" | "Guarantee Period" | "Offer Accepted" | "Offer Sent";
}
