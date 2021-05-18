import React from 'react'
import CategoryTable from '../../components/CategoryTable/categoryTable'
import Footer from '../Footer/footer'
import NavBar from '../NavBarAdmin/navBarAdmin'

const AllCategory = () => {
    return (
        <div>
            <NavBar />
            <CategoryTable />
            <Footer />
        </div>
    )
}

export default AllCategory
