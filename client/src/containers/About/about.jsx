import React from "react"
import Footer from "../Footer/footer"
import ImagenAbout from "../../assets/aboutus.png"
import ImagenJuanIgnacio from "../../assets/Juan.jpg"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"

export default function About() {
    function redirigir(direccion) {
        window.location.href = direccion;
        return;
    }
    return (
        <div>
            <UniversalNavBar />
            <div className="flex justify-center pt-20">
                <div className="flex flex-col">
                    <div className="flex justify-center my-10">
                        <div className="flex flex-col justify-center align-center content-center">
                            <div className="flex justify-center">
                                <img className="w-80" src={ImagenAbout} />
                            </div>
                            <p className="px-20 py-10 text-justify">TEXTO GENERAL: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta dolor in elementum congue. Proin rutrum nisl velit, hendrerit suscipit purus mattis sed. Donec iaculis convallis tortor, at bibendum lorem mollis sed. Nunc dapibus ante eleifend iaculis rutrum. Sed ornare nibh a volutpat sagittis. Nulla facilisi. Integer tincidunt interdum tristique. Donec vitae mauris risus. Duis non ultrices eros, ac vulputate justo. Aliquam id tempus justo. Phasellus consequat ullamcorper diam. Nunc efficitur condimentum dignissim. Aliquam felis ex, consectetur eu pellentesque sed, eleifend non enim. Aliquam erat volutpat. Cras vulputate bibendum nibh, vel porta mi imperdiet eu. </p>
                        </div>
                    </div>
                    <div className="flex justify-center mx-20">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://i.pinimg.com/736x/11/37/ee/1137ee964d8dcd7048f62001fe6434cc.jpg" alt="not found" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Diego texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Diego121520")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://mk0lanoticiapwmx1x6a.kinstacdn.com/wp-content/uploads/2020/08/gato_png_crop1567201738546-jpg_673822677-1.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Juliana texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/julianactrl")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://cdn-pro.elsalvador.com/wp-content/uploads/2019/12/Memes-de-Gatos-015-300x231.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">German texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Germanchrystan")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://i.pinimg.com/originals/a1/f1/7a/a1f17a5e38cb4b173203fa3b58aa8f1c.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Francisco texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/FranG14")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://cdn.generadormemes.com/media/templates/xgato_enojado33.jpg.pagespeed.ic.plantilla-memes.jpg" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Juan Agustin texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/AgustinReynaud")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src={ImagenJuanIgnacio} />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Mi carrera anterior fue en comercio minorista, ingreso de datos, reparación y ensamblaje de computadoras, redes de computadoras y cámaras de seguridad. Recientemente he vuelto a capacitarme como desarrollador web de pila completa en
                            JavaScript,
                            CSS,
                            HTML
                            NodeJs,
                            React,
                            Redux,
                            SQL

                            Estoy buscando un trabajo de desarrollador de nivel de entrada donde pueda aprender y usar mis nuevas habilidades en un entorno práctico, he realizado varios proyectos durante mi capacitación utilizando Visual Studio Code, Postman y lenguajes de codificación, estoy comprometido a producir sitios web con un gran experiencia del usuario y que están optimizados para SEO para tener un alto rango en los resultados de búsqueda de Google.

                                Para ver más detalles, por favor, busque en mi github.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/Pitelbarbia")}>Github</button>

                        </div>
                    </div>
                    <div className="flex justify-center mx-20 my-10">
                        <img className="w-32 h-32 rounded-full border-green-500 border-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQ0gUFiWvt2SqU6kufMvSTPOYgYHS3ua0oivfLbJ1UCMcc9xZNqBWpD4TZW8AZc340Ug&usqp=CAU" />
                        <div className="flex flex-col justify-center items-center">
                            <p className="mx-10">Jonathan texto: In fringilla ex nulla, non pellentesque lacus blandit ac. Donec blandit consequat nibh, eget hendrerit nulla suscipit eu. Vivamus risus justo, scelerisque eget mattis sed, rhoncus nec nulla. Duis pretium pulvinar vestibulum.</p>

                            <button className="my-5 text-lg font-bold pl-2 pr-16 py-2 bg-transparent rounded-lg w-16 text-green-500 border-green-500 border-2" onClick={e => redirigir("https://github.com/nohaynicksdisponibles")}>Github</button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}