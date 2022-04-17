import React, {Component} from 'react'

const TableHeader = (props) => {
    return (
        <thead>
        <tr>
            <th onClick={() => props.sortEntries('id')}>ID</th>
            <th>Date</th>
            <th onClick={() => props.sortEntries('Title')}>Title</th>
            <th onClick={() => props.sortEntries('Count')}>Count</th>
            <th onClick={() => props.sortEntries('Distance')}>Distance</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.entriesData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.Date}</td>
                <td>{row.Title}</td>
                <td>{row.Count}</td>
                <td>{row.Distance}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
}

const TableFooter = (props) => {
    const buttonCount = Math.ceil(props.initialEntriesData.length / 5);
    const buttonNumbers = [];
    for(let i = 1; i<=buttonCount; i++) {
        buttonNumbers.push(i);
    }
    const buttons = buttonNumbers.map((index) => {
        return (
            <button onClick={props.sliceEntries} value={index}>{index}</button>
        )
    });


    return <div>{buttons}</div>
}


const Table = (props) => {
    const {entriesData, sortEntries, sliceEntries, initialEntriesData} = props

    return (
        <table>
            <TableHeader  sortEntries={sortEntries} />
            <TableBody entriesData={entriesData} />
            <TableFooter sliceEntries={sliceEntries} entriesData={entriesData} initialEntriesData={initialEntriesData}/>
        </table>
    )
}

export default Table