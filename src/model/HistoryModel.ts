export interface HistoryResponse {
    history: DocumentHistory[];
}

export interface DocumentHistory {
    doc_type_id: number;
    doc_summary_id: number;
    file_name: string;
    summary_time: string;
    status: string;
    doc_type: string;
}