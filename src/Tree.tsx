import type React from 'react'
import { useState } from 'react'
import type { FileSystemItem } from './data'

interface ItemProps {
  item: FileSystemItem
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div style={{ marginLeft: '20px', textAlign: 'left' }}>
      <div
        onClick={toggleOpen}
        style={{
          cursor: hasChildren ? 'pointer' : 'default',
          fontWeight: hasChildren ? 'bold' : 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span>{item.type === 'folder' ? (isOpen ? '📂' : '📁') : '📄'}</span>
        <span>{item.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {item.children!.map((child) => (
            <Item key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}

interface TreeProps {
  data: FileSystemItem[]
}

export const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div className="tree-container">
      {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}
