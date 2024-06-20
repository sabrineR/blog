export interface IMenuItemProps{
    open:boolean;
    icon: React.ReactNode;
    text: string;
    path: string;
    onClick?: () => void;
}