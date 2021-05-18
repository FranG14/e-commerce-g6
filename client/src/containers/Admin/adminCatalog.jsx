import React from 'react'
import TableProduct from './../../components/CrudProduct/tableProduct'
import NavBarAdmin from '../NavBarAdmin/navBarAdmin'

const AdminCatalog = () => {
    return (
        <div>
            <NavBarAdmin />
            <TableProduct />
        </div>
    )
}

export default AdminCatalog
