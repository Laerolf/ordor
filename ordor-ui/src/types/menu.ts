export interface MenuItem {
  id: string
  name: string
  price: number
  category: MenuCategory
  description: string
  imageUrl?: string
}

export enum MenuCategory {
  APPETIZER = 'APPETIZER',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  DRINK = 'DRINK'
}
