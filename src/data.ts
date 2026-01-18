export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  children?: FileSystemItem[];
}

export const fileSystemData: FileSystemItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    size: 6428,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        size: 3456,
        children: [
          {
            id: '3',
            name: 'Button.tsx',
            type: 'file',
            size: 2143,
          },
          {
            id: '4',
            name: 'Input.tsx',
            type: 'file',
            size: 1313,
          },
        ],
      },
      {
        id: '5',
        name: 'App.tsx',
        type: 'file',
        size: 1845,
      },
      {
        id: '6',
        name: 'main.tsx',
        type: 'file',
        size: 1127,
      },
    ],
  },
  {
    id: '7',
    name: 'public',
    type: 'folder',
    size: 1422,
    children: [
      {
        id: '8',
        name: 'vite.svg',
        type: 'file',
        size: 1422,
      },
    ],
  },
  {
    id: '9',
    name: 'package.json',
    type: 'file',
    size: 1452,
  },
  {
    id: '10',
    name: 'tsconfig.json',
    type: 'file',
    size: 928,
  },
];
