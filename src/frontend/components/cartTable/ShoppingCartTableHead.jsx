import {TableCell, TableHead, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import React from "react";

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Food' },
    { id: 'price', numeric: true, disablePadding: false, label: 'price' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'amount' },
];

const ShoppingCartTableHead = (props) => {
    const {numSelected, rowCount, onSelectAllClick} = props;

    return (
        <TableHead>
            <TableRow>

                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

ShoppingCartTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
};

export default ShoppingCartTableHead