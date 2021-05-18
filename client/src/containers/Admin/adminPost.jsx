import React from 'react'
import Footer from '../Footer/footer'
import NavBar from '../NavBar/navBar'
import ProductPostForm from '../../components/CrudProduct/productPost'

const AdminPost = () => {
    return (
        <div>
            <NavBar />
            <ProductPostForm />
            <Footer />
        </div>
    )
}

export default AdminPost
