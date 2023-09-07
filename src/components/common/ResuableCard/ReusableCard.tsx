import { Card } from '@mui/material'
import React, { CSSProperties, FC, ReactNode } from 'react'
import "./ReusableCard.css"

interface ReusableCardProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

const ReusableCard: FC<ReusableCardProps> = ({ children, className, style }) => {
    return (
        <Card className={className} style={style}>{children}</Card >
    )
}

export default ReusableCard;