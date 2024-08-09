export interface IListItem {
    id:string,
    editUrl?:string
    viewUrl?:string
    items:string[],
    name:string,
    withAvatar?:boolean
}

export interface IAdminListItem {
    listItem: IListItem
    removeHandler?: () => void
}