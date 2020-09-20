import React, { Component } from "react";
import "./App.css";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { RentalStations } from "./containers/RentalStations";

class App extends Component {
  render() {
    // const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    //   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    //   cache: new InMemoryCache(),
    //   connectToDevTools: true,
    // });

    const client = new ApolloClient({
      uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query bikes {
            bikeRentalStations {
              name
              stationId
              bikesAvailable
              spacesAvailable
            }
          }
        `,
      })
      .then((result) => console.log(result));
    // const client = new ApolloClient({
    //   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    // });

    return (
      <div className="App">
        <header>
          <h1>HSL Kaupunkipyörät</h1>
          <h2>Tiedot asemista</h2>
        </header>
        <ApolloProvider client={client}>
          <main>
            <div className="rentalStations">
              <RentalStations />
            </div>
          </main>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
