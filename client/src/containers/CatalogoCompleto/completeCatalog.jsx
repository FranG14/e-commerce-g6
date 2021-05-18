import React from 'react'
import Catalogo from '../../components/Catalogo/Catalogo'
// import FilterBar from '../../components/FilterBar/FilterBar'
import Footer from '../../components/Footer/Footer'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'



const CompleteCatalog = () => {
    return (
        <div>
            <NavBarAdmin />
            <Catalogo />
            <Footer />
        </div>
    )
}

export default CompleteCatalog
