import Head from 'next/head'
import Navbar from '../components/navbar'
import Logo from '../components/logo'
import Button from '../components/button'

export default function Home({ data }) {
  return (
    <div className=''>
      <Head>
        <title>Fitstore</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Navbar />

      <main className=''>
        <header className='container lg:px-32 md:px-12 px-8 pt-36 pb-16 md:pb-36 md:pt-56 text-center flex flex-col items-center'>
          <h1 className='title text-5xl md:text-7xl lg:text-8xl max-w-[820px] mb-10'>
            <span className='relative z-30 text-white'>Una mejor manera de regenerarse</span>
          </h1>
          <p className='text-xl md:text-3xl mb-10 lg:mb-12 relative bg-blend-color-dodge z-30 max-w-[600px]'>
            Aumenta tu rendimiento deportivo con los mejores sumplementos para deportistas
          </p>

          <Logo />
        </header>

        <section className='container lg:px-32 md:px-12 px-8 flex flex-col items-start overflow-hidden'>
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid mb-0 md:mb-10">
            <div className="w-full rounded-[35px] md:ml-14 md:h-full min-h-[350px] md:w-[500px] md:order-2 mb-4 md:mb-0 flex justify-center pro-gainer-image">
              <div className="my-auto bg-transparent">
                <img src="./images/PRO.png" className='w-72 h-72 md:w-full md:h-full' alt="" />
              </div>
            </div>
            <div className='mt-4 md:mt-0'>
              <h1 className='font-extrabold title text-5xl md:text-7xl lg:text-8xl'>
                <span className='relative z-30 text-white'>PRO</span>
              </h1>
              <h2 className='subtitle font-bold text-xl md:text-3xl'>HIGH-PROTEIN GAINER</h2>
              <p className='font-normal text-xl md:text-xl'>
                Aumentar de tamaño requiere un equilibrio
                entre entrenamiento pesado, descanso
                adecuado y nutrición de calidad. Debido a
                que todos somos un poco diferentes, a
                algunos les cuesta más ganar masa múscular.
                <br />
                <br />
                <span className='subtitle'>PRO GAINER</span> es una fórmula rica en proteínas
                que proporciona calorías que cuentan durante
                la recuperación. Cada batido proporciona una
                gran cantidad de proteínas, carbohidratos,
                vitaminas y minerales suplementarios para
                aumentar la cantidad que obtiene a través de
                una dieta equilibrada de alimentos.
              </p>
              <Button />
            </div>
          </div>
        </section>

        <section className='container lg:px-32 md:px-12 px-8 py-20'>
          <h2 className='text-2xl font-semibold mb-4 text-[#3081ed]'>Lista de productos</h2>
          <div className='flex gap-2 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700'>
            {
              data.map(({ id, name, price, image, description }) => (
                <article key={id} className='p-4 bg-[#222537] rounded-md'>
                  <img src={image} className='max-w-max' alt={name}/>
                  <h3 className='subtitle text-2xl text-white mt-2 font-semibold'>{name}</h3>
                  <h5>{description}</h5>
                  <h5 className='text-xl font-semibold'>$ {price}</h5>
                </article>
              ))
            }
          </div>
        </section>
      </main>

      <style jsx>{`
        img {
          width: auto;
        }
        .title {
          font-weight: 700;
          letter-spacing: -.05em;
          color: rgb(255, 255, 255, 1);
        }

        .subtitle {
          background: linear-gradient(90.49deg, rgba(171, 105, 214, 0.75) 4.48%, rgba(171, 105, 214, 0.75) 92.41%), rgba(255, 255, 255, 0.75);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .pro-gainer-image {
          background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);
          backdrop-filter: blur(1110px);
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/products')
    const data = await res.json()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error);
  }
}

