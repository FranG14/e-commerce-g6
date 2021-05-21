import React from 'react'
import CategoryTable from '../../components/CategoryTable/categoryTable'
import UniversalNavBar from '../../components/UniversalNavBar/universalNavBar'
import Footer from '../Footer/footer'

const AllCategory = () => {
    return (
        <div>
            <UniversalNavBar />
            <CategoryTable />
            <Footer />
        </div>
    )
}

export default AllCategory
