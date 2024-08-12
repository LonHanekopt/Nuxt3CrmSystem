export interface IMenuItem {
  name: string
  url: string
  icon: string
}

export const MENU_DATA: IMenuItem[] = [
  {
    icon: 'radix-icons:dashboard',
    name: 'Home',
    url: '/'
  },
  {
    icon: 'ep:goods',
    name: 'Products',
    url: '/'
  },
  {
    icon: 'ph:contactless-payment',
    name: 'Payments',
    url: '/'
  },
  {
    icon: 'fluent:receipt-sparkles-24-regular',
    name: 'Orders',
    url: '/'
  },
  {
    icon: 'mingcute:group-line',
    name: 'Customers',
    url: '/'
  }
]