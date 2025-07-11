import { Card, Checkbox, Input } from 'antd';
import { useMemo } from 'react';

interface Option {
  id: number | string;
  label: string;
}

interface Props {
  items: Option[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  search: string;
  onSearchChange: (val: string) => void;
  title?: string;
}

const SearchableCheckboxList: React.FC<Props> = ({
  items,
  selectedIds,
  onChange,
  search,
  onSearchChange,
  title = 'Select Items',
}) => {
  const sortedItems = useMemo(() => {
    const selected = items.filter((i) => selectedIds.includes(String(i.id)));
    const unselected = items.filter((i) => !selectedIds.includes(String(i.id)));
    return [...selected, ...unselected];
  }, [items, selectedIds]);

  return (
    <div>
      <label className="block font-medium mb-2">{title}</label>
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-1"
        allowClear
      />
      <p className="text-sm text-gray-500 mb-2">
        Selected {selectedIds.length} of {items.length}
      </p>
      <Card className="border rounded-lg p-4 max-h-48 overflow-y-auto">
        <Checkbox.Group
          value={selectedIds}
          onChange={(val) => onChange(val as string[])}
        >
          <div className="flex flex-col gap-2">
            {sortedItems.map((item) => {
              const isVisible = item.label.toLowerCase().includes(search.toLowerCase());
              return (
                <div key={item.id} className={isVisible ? '' : 'hidden'}>
                  <Checkbox value={String(item.id)}>{item.label}</Checkbox>
                </div>
              );
            })}
          </div>
        </Checkbox.Group>
      </Card>
    </div>
  );
};

export default SearchableCheckboxList;
