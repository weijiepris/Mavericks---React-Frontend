/* eslint-disable */
import { FC, useEffect, useState } from 'react'
import ReusableCard from '../ResuableCard/ReusableCard';
import "./Pagination.css"
import { Button } from '@mui/material';

interface PaginationProps {
    items: any;
    rowsPerPage: number;
    showItem: Function;
}

const Pagination: FC<PaginationProps> = ({ items, rowsPerPage, showItem }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [fromIndex, setFromIndex] = useState<number>(1);
    const [toIndex, setToIndex] = useState<number>(10);
    const [returnItems, setReturnItems] = useState<any[]>([]);

    // to set initial items on page load
    useEffect(() => {
        filterItems()
    }, [])

    useEffect(() => {
        calculatePages()
    }, [items.length])

    useEffect(() => {
        calculatePages()
    }, [currentPage])

    useEffect(() => {
        filterItems();
    }, [toIndex, fromIndex])

    useEffect(() => {
        showItem(returnItems);
    }, [returnItems])

    const calculatePages = () => {
        const maxPage = currentPage * 10;
        const minPage = currentPage * 10 - 9;

        setToIndex((prev) => maxPage < items.length ? prev = maxPage : prev = items.length)
        setFromIndex((prev) => items.length === 0 ? prev = 0 : prev = minPage)
    }

    const filterItems = () => {
        let tempItems: any = [];
        for (let i = fromIndex - 1; i < toIndex; i++) {
            tempItems = [...tempItems, items[i]];
        }
        setReturnItems(tempItems)
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <ReusableCard className="div-margin-top">
            <ReusableCard className="pagination">
                <ReusableCard className="left hide-on-mobile-view">
                    <span className='primary-text-col'>
                        Showing {fromIndex} - {toIndex} out of {items.length} entries
                    </span>
                </ReusableCard>

                <ReusableCard className="right">
                    <span className='primary-text-col'>
                        <Button disabled={currentPage === 1} onClick={() => handlePreviousPage()}>Previous</Button>
                        <span className='primary-text-col page-number'>{currentPage}</span>
                        <Button disabled={currentPage === Math.ceil(items.length / rowsPerPage)} onClick={() => handleNextPage()}>Next</Button>
                    </span>

                </ReusableCard>
            </ReusableCard>
        </ReusableCard>
    )
}

export default Pagination