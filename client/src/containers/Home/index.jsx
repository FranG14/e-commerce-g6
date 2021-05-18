import React from "react";
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar";
import Carousel from "../../containers/Carousel/carousel"
import GridHome from "./gridHome"
import Footer from '../Footer/footer';
export default function Home() {
  return (
    <main>
      <UniversalNavBar />
      <Carousel productos={[{ id: 1, url: "https://www.hola.com/imagenes/estar-bien/20180312121453/ropa-contamina-medio-ambiente/0-548-821/ropa-medioambiente-t.jpg?filter=w600&filter=ds75" }, { id: 2, url: "https://percentil.com/blog/wp-content/uploads/2019/10/Segunda-mano-1080x720.jpg" }, { id: 3, url: "https://economiasustentable.com/wp-content/uploads/2020/01/ropa.png" }, { id: 4, url: "https://www.manosunidas.org/sites/default/files/styles/full-news-hightlighted/public/exj_ropa_1.jpg?itok=qYz_7Cg-&timestamp=1590663388" }]} />
      <GridHome cards={[{ name: "Men", url: "https://i.pinimg.com/736x/45/4f/a1/454fa1374f27345a7e2bc282e9a7d01c.jpg" },
      { name: "Kids", url: "https://images-na.ssl-images-amazon.com/images/I/51WQbdvSyNL._SX500_SY500_CR,0,0,500,500_.jpg" },
      { name: "Winter", url: "https://ae01.alicdn.com/kf/He36ec0e4f38a4c54a5037e791b08b5eeR/2021-New-Children-s-Down-Jacket-Baby-Winter-Clothes-Kids-Down-Jacket-Set-Baby-Boys-girl.jpg_Q90.jpg_.webp" },
      { name: "Summer", url: "https://www.clara.es/medio/2019/03/28/como-combinar-ropa-primavera-verano-2019-asos-3299%E2%82%AC_1e4bbf40_1000x1500.jpg" },
      { name: "Autumn", url: "https://www.hogarmania.com/archivos/201710/moda-otono-marrones-XxXx80.jpg" },
      { name: "Musculosas", url: "https://http2.mlstatic.com/D_NQ_NP_687408-MLA43833048887_102020-W.jpg" },
      { name: "Woman", url: "https://i.pinimg.com/originals/21/e2/d1/21e2d107814786936b920ba2620b4fcc.jpg" },
      { name: "Woman winter", url: "https://notilook.com.ar/wp-content/uploads/2019/03/abrigo-mujer-juvenil-kill-invierno-2019-.jpg" },
      { name: "Woman autumn", url: "https://i.pinimg.com/736x/ef/bf/05/efbf0567ea95a3d2d0e00a70d345e2c0.jpg" },
      { name: "Winter long", url: "https://i.pinimg.com/564x/9a/3c/03/9a3c03b69518c874f2bbf3ae9aca47af.jpg" },
      { name: "Woman spring", url: "https://www.dhresource.com/0x0/f2/albu/g7/M00/21/54/rBVaSVrG4H2ALtX5AARitu-7SZM250.jpg/women-039-s-wear-spring-clothes-irregularity.jpg" },
      { name: "man autumn", url: "https://i.pinimg.com/originals/a1/06/b6/a106b6ca40e14e29f36fde3461216460.jpg" }]} />
      <Footer />
    </main>
  );
}
