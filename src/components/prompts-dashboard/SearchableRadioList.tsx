import React from 'react';
import { Card, Input, Radio } from 'antd';

interface Item {
  id: number;
  label: string;
}

interface Props {
  title?: string;
  items: Item[];
  selectedId?: number;
  onChange: (id: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchableRadioList: React.FC<Props> = ({
  title,
  items,
  selectedId,
  onChange,
  search,
  onSearchChange,
}) => {
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {title && <label className="block font-medium mb-2">{title}</label>}
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-2"
        allowClear
      />
      <Card className="border rounded-lg p-4 max-h-48 overflow-y-auto">
        <Radio.Group
          value={selectedId}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        >
          <div className="flex flex-col gap-2">
            {filteredItems.map((item) => (
              <Radio key={item.id} value={item.id} className="block">
                {item.label}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </Card>
    </div>
  );
};

export default SearchableRadioList;
