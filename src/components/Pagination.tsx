interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalEntries: number;
    currentEntriesCount: number;
}

export default function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalEntries,
    currentEntriesCount 
}: PaginationProps) {
    return (
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Showing {currentEntriesCount} of {totalEntries} entries</span>
            <div className="flex items-center gap-1">
                <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-2.5 py-1 rounded border border-zinc-200 bg-white hover:bg-zinc-50 cursor-pointer disabled:opacity-50 transition-colors"
                >
                    Previous
                </button>
        
                <span className="px-2.5 py-1 rounded border border-zinc-900 bg-zinc-950 text-white">
                    {currentPage}
                </span>
        
                <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-2.5 py-1 rounded border border-zinc-200 bg-white hover:bg-zinc-50 cursor-pointer disabled:opacity-50 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}