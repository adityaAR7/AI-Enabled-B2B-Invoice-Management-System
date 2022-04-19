import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel,Checkbox} from '@material-ui/core'
import React, { useState } from 'react'
const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(3),
        '& thead th': {
            fontWeight: "600",
            color: "#fff",
            backgroundColor: "#253742"
        },
        '& tbody td': {
            color: "#fff",
            fontWeight: "300"
        },
        '& tbody tr:hover': {
            backgroundColor: "#2a3e4c",
            cursor: "pointer"
        }
    },
    tp:{
        color:"#fff"
    }
}))

export default function useTable(records, headCells,setFilter) {
    const classes = useStyles()
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = props => (
        <Table className={classes.table} size="small" stickyHeader aria-label="sticky table" >
            {props.children}
        </Table>
    )
    const TblHead = props => {
        const { onSelectAllClick,numSelected} =props;
        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order == "asc"
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(cellId)
        }

        return (

            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < records.length}
                            checked={records.length > 0 && numSelected === records.length}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {
                        headCells.map(headcell => (
                            <TableCell key={headcell.id}
                                
                                sortDirection={orderBy === headcell.id ? order : false}>

                                {headcell.disableSorting ? headcell.label : <TableSortLabel
                                    active={orderBy === headcell.id}
                                    direction={orderBy === headcell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headcell.id) }}>
                                    {headcell.label}
                                </TableSortLabel>}

                            </TableCell>
                        ))
                    }

                </TableRow>
            </TableHead>
        )
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowPerPage - records.length) : 0;

    const TblPagination = () => (
        <TablePagination
            className={classes.tp}
            rowsPerPageOptions={pages}
            component="div"
            count={records.length}
            rowsPerPage={rowPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage} />
    )
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        })
        return stabilizedThis.map((el) => el[0]);
    }
    function getComparator(order, orderBy) {
        return order == 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(setFilter.fn(records), getComparator(order, orderBy)).slice(page * rowPerPage, (page + 1) * rowPerPage)

    }
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        emptyRows
    }
}
