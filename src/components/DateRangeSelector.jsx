const DateRangeSelector = ({ selectedRange, onChange }) => {
    return (
        <select
            id="date-range"
            value={selectedRange}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="h-10 px-4 py-2 border rounded text-sm"
        >
            <option className="text-gray-900" value={1}>Today</option>
            <option className="text-gray-900" value={10}>10 Days</option>
            <option className="text-gray-900" value={30}>30 Days</option>
            <option className="text-gray-900" value={60}>60 Days</option>
            <option className="text-gray-900" value={90}>90 Days</option>
        </select>
    );
};

export default DateRangeSelector;
