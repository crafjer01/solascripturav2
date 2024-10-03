import './home.css';

export const Home = () => {
  return (
    <>
      <main className="main_wrapper">
        <div className="main_container">
          <div className="main_left">
            <div className="content">
              <h1 className="title">¿Qué sabes de la Biblia?</h1>
              <div className="text">
                <p>La Biblia contiene el mensaje de Dios para la humanidad.
                  Pese a que es el libro más vendido en el mundo, no debemos tomar su lectura a la ligera.
                  Es importante leerla, estudiarla, practicarla y compartirla; de modo que tengamos una mejor relación con los demás,
                    y un vínculo estrecho con Dios.</p>
              </div>
              <h2 className="subtitle">SolaScriptura</h2>
              <div className="text">
                <p>Llega para que puedas divertirte junto a otros mientras aprenden de la palabra de Dios.</p>
              </div>
              <div className="buttons">
                <button className="btn-primary">Iniciar</button>
              </div>
            </div>
          </div>  
          <div className="main_right">
            <div className="img-container">
              <img src="/assets/logo.png" alt="" />
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="footer">
        <div className="medial-icon">
          <div className="media-icon-item">
            <i class="material-icons">person</i>
          </div>
          <div className="media-icon-item">
            <i class="material-icons">person</i>
          </div>
          <div className="media-icon-item">
            <i class="material-icons">person</i>
          </div>
        </div>
      </footer> */}
    </>
  );
};
