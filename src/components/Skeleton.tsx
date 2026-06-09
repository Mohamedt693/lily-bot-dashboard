export function TableSkeleton() {
    return (
        <tbody className="divide-y divide-zinc-100">
            {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 w-40 bg-zinc-200 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-20 bg-zinc-200 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-24 bg-zinc-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="h-4 w-16 bg-zinc-200 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-24 bg-zinc-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="h-8 w-16 ml-auto bg-zinc-200 rounded" /></td>
                </tr>
            ))}
        </tbody>
    );
}