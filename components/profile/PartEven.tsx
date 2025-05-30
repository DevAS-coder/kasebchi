
export default function PartEven({ title, value }: { title: string, value: any }) {
    let displayValue

    if (typeof value === 'boolean') {
        displayValue = value ? 'انجام شده' : 'انجام نشده'
    } else {
        displayValue = value
    }

    return (
        <div className="flex flex-col border-b-2 p-5 border-gray-300 gap-2">
            <span>{title}:</span>
            <span>{displayValue}</span>
        </div>
    )
}
