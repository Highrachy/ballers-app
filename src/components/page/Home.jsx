import React from 'react';
import Header from 'components/layout/Header';
import { ReactComponent as PolkaDot } from 'assets/img/backgrounds/polka-dot.svg';

const Home = () => (
  <>
    <Header />
    <section>
      <div className="row mr-0 ml-0">
        <section className="col-md-6 pl-6">
          <h1 className="mt-6">
            Become <br /> a LandLord
          </h1>
          <p className="mt-4 text-muted">
            We make owning a home simpler and achievable.
          </p>
          <div className="dotted-polka">
            <PolkaDot width="100" />
          </div>
          {/* <section className="card mt-n8">
            <div className="input-group mb-3">
              <input
                className="form-control rounded mx-0"
                type="text"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                className="form-control rounded mx-0"
                type="text"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                className="form-control rounded mx-1"
                type="text"
                placeholder="Password"
                aria-label="Password"
              />
              <button className="btn btn-secondary" type="button">
                Register
              </button>
            </div>
          </section> */}

          <p className="holding-small">
            The only realistic burden free process of owning your ideal home.
          </p>
        </section>
        <section className="col-md-6 home-bg"></section>
      </div>
    </section>
  </>
);

export default Home;
