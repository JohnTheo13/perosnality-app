import React, { Component } from "react";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import { get } from "../../api";
import { rolePNG } from "../Row/helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 12
  },
  image: {
    marginTop: 12,
    marginBottom: 12
  }
});

const ResultView = ({
  name,
  translationKey,
  descriptionPit,
  descriptionStrong
}) => (
  <View style={styles.container}>
    <Text style={styles.header}>{name}</Text>
    <Image style={styles.image} source={rolePNG(translationKey)} />
    <Text style={styles.header}>Your Strong Points</Text>
    <Text>{descriptionStrong}</Text>
    <Text style={styles.header}>Your Weak Points</Text>
    <Text>{descriptionPit}</Text>
  </View>
);

class ShowResults extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  async componentDidMount() {
    const { sessionId } = this.props;
    const { result } = await get(`result/${sessionId}`);
    this.setState({ results: result });
  }

  render() {
    const {
      results: { length },
      results
    } = this.state;
    if (length === 0) {
      return <Text>Loading</Text>;
    }

    return (
      <ScrollView>
        {length > 1 ? (
          results.map(({ role }) => <ResultView {...role} />)
        ) : (
          <ResultView {...results[0].role} />
        )}
      </ScrollView>
    );
  }
}

export default ShowResults;
