import { useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Menu, MenuItem, IconButton, ListItemIcon, ListItemText} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import productCookies from '../../../productCookies'

export default function TableMoreMenu(props) {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const { productName, price, category, description, stock, fetchProducts} = props
    const navigate = useNavigate();

    const onDeleteItem =() => {
       
        let productNames = [productName];
        let data = {products: productNames};
        axios.post('/api/dashboard/product/delete', data)
            .then(res => {
                console.log('deleted' + res.data);
                fetchProducts('')
            })
            .catch(err => console.log(err.data));
    }

    const onEditItem = () => {
        productCookies.onSetProduct(productName, description, price, category, stock);
        navigate('/dashboard/updateProduct')
    }
    return (
        <>
            <IconButton ref={ref} onClick={() => setOpen(true)}>
                <MoreVertIcon width={20} height={20} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem sx={{ color: 'text.secondary' }}
                    onClick={() => onDeleteItem()}
                >
                    <ListItemIcon>
                        <DeleteIcon width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>

                <MenuItem sx={{ color: 'text.secondary' }}
                    onClick={() => onEditItem()}
                >
                    <ListItemIcon>
                        <EditIcon width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
            </Menu>
        </>
    );
}
