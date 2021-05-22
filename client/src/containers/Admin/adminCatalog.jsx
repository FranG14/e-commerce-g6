import React from 'react'
import TableProduct from './../../components/CrudProduct/tableProduct'
import UniversalNavBar from '../../components/UniversalNavBar/universalNavBar'
import Footer from '../Footer/footer'

const AdminCatalog = () => {
    return (
        <div>
            <UniversalNavBar />
            <TableProduct />
            <Footer />
        </div>
    )
}

export default AdminCatalog
