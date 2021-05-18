import React from 'react'
import Catalogo from '../../components/Catalog/catalog'
// import FilterBar from '../../components/FilterBar/FilterBar'
import Footer from '../Footer/footer'
import UniversalNavBar from '../../components/UniversalNavBar/universalNavBar'



const CompleteCatalog = () => {
    return (
        <div>
            <UniversalNavBar />
            <Catalogo />
           <Footer />
        </div>
    )
}

export default CompleteCatalog
