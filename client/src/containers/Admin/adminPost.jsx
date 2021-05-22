import React from 'react'
import Footer from '../Footer/footer'
import UniversalNavBar from '../../components/UniversalNavBar/universalNavBar'
import ProductPostForm from '../../components/CrudProduct/productPost'

const AdminPost = () => {
    return (
        <div>
            <UniversalNavBar />
            <ProductPostForm />
            <Footer />
        </div>
    )
}

export default AdminPost
