import React from 'react';
import {Pagination} from 'react-bootstrap/'

const PaginationItem = () => {
    const paginationStyle={
        float:"left",

    }
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <>
            <Pagination style={paginationStyle}>
                <Pagination.First/>
                <Pagination.Prev/>
                {items}
                <Pagination.Next/>
                <Pagination.Last/>
            </Pagination>
        </>
    );
};

export default PaginationItem;