export interface PlacementItem {
    id: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    position: string;
    client: string;
    salary: string;
    placedDate: string;
    status: string;
}

export interface PlacementListProps {
    placements: PlacementItem[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    page: number;
    onPageChange: (page: number) => void;
    hasMore: boolean;
    hasLess: boolean;
    isLoading: boolean;
    allCount: number;
    offersCount: number;
    activeCount: number;
}
