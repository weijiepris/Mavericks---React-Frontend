import { Card } from '@mui/material'
import React, { CSSProperties, FC, ReactNode } from 'react'
import "./ReusableCard.css"

interface ReusableCardProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    onClick?: Function
}

const ReusableCard: FC<ReusableCardProps> = ({ children, className, style, onClick }) => {
    return (
        <Card className={className} style={style} onClick={() => onClick}>{children}</Card >
    )
}

export default ReusableCard;