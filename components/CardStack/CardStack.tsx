import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
//@ts-ignore
import SwipeCards from 'react-native-swipe-cards-deck';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { connect } from 'react-redux';
import { Text } from '../Themed';
import { Education, Experience, Card as CardType } from '../../types';
import TabBarIcon from '../../hooks/TabBarIcon';
import { fetchCards } from '../../redux/actions';

function EducationSection({ data, index }: { data: Education; index: number }) {
  const color = useColorScheme();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {index === 0 ? (
          <TabBarIcon
            color={Colors[color].text}
            name="graduation-cap"
            type="FontAwesome"
            size={30}
          />
        ) : (
          <View />
        )}
      </View>
      <View>
        <Text style={[styles.titleText, styles.allText]}>{data.name}</Text>
        {data.major ? (
          <Text style={[styles.allText, { fontSize: 18 }]}>{data.major}</Text>
        ) : null}
        <Text
          style={[
            styles.subtitleText,
            styles.allText,
            { color: Colors[color].greyText },
          ]}
        >
          {data.date}
        </Text>
      </View>
    </View>
  );
}
function ExperienceSection({
  data,
  index,
}: {
  data: Experience;
  index: number;
}) {
  const color = useColorScheme();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {index == 0 ? (
          <TabBarIcon
            color={Colors[color].text}
            name="briefcase-variant"
            type="MaterialCommunityIcons"
            size={35}
          />
        ) : (
          <View />
        )}
      </View>
      <View>
        {data.organization ? (
          <Text style={[styles.titleText, styles.allText]}>
            {data.title} at {data.organization}
          </Text>
        ) : (
          <Text style={[styles.titleText, styles.allText]}>{data.title}</Text>
        )}
        <Text
          style={[
            styles.subtitleText,
            styles.allText,
            { color: Colors[color].greyText },
          ]}
        >
          {data.date}
        </Text>
      </View>
    </View>
  );
}

function Card({ data }: { data: CardType }) {
  const color = useColorScheme();
  console.log(data);
  const experience = data?.experience
    .filter((val: Experience, index: number) => index <= 2)
    .map((element: Experience, index: number) => {
      return <ExperienceSection data={element} key={index} index={index} />;
    });
  const education = data?.education
    .filter((val: Education, index: number) => index <= 1)
    .map((element: Education, index: number) => {
      return <EducationSection data={element} key={index} index={index} />;
    });

  return (
    <ScrollView>
      <View
        style={[
          styles.cardContainer,
          styles.card,
          { backgroundColor: Colors[color].background },
        ]}
      >
        <View
          style={[
            styles.headerImage,
            { backgroundColor: Colors[color].headerImage },
          ]}
        />
        <Image
          style={styles.profileImage}
          source={{ uri: data.picture }}
          resizeMode="cover"
        />
        <Text style={styles.name}>{data.name}</Text>
        {experience}
        {education}
      </View>
    </ScrollView>
  );
}

function StatusCard({ text }: any) {
  const color = useColorScheme();
  return (
    <View>
      <Text style={[styles.cardsText, { color: Colors[color].text }]}>
        {text}
      </Text>
    </View>
  );
}

function CardStack(props: { cards: CardType[]; fetchCards: () => void }) {
  function handleYup(card: { text: string; backgroundColor: string }) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card: { text: string; backgroundColor: string }) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card: { text: string; backgroundColor: string }) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  useEffect(() => {
    props.fetchCards();
  }, [props.fetchCards]);

  const color = useColorScheme();
  return (
    <View style={[styles.container, { shadowColor: Colors[color].text }]}>
      {props.cards?.length > 0 ? (
        <SwipeCards
          cards={props.cards}
          renderCard={(cardData: CardType) => <Card data={cardData} />}
          key={(cardData: CardType) => String(cardData.name)}
          keyExtractor={(cardData: CardType) => String(cardData.name)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          handleYup={handleYup}
          handleNope={handleNope}
          handleMaybe={handleMaybe}
          hasMaybeAction={false}
          smoothTransition={false}
          showYup={false}
          showNope={false}
          showMaybe={false}
          dragY={false}
          // If you want a stack of cards instead of one-per-one view, activate stack mode
          // stack={true}
          // stackDepth={3}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}

function mapStateToProps(state: {
  cards: CardType[]; //update when cards type gets updated
}) {
  return {
    cards: state.cards,
  };
}

const mapDipatchToProps = {
  fetchCards,
};

export default connect(mapStateToProps, mapDipatchToProps)(CardStack);

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    backgroundColor: '#5A658B',
    width: Layout.window.width * 0.9,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  cardContainer: {
    borderRadius: 25,
  },
  card: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Layout.window.width - 20, //subtracting margin
    minHeight: '100%',
  },
  cardsText: {
    fontSize: 22,
  },
  headerImage: {
    width: '100%',
    height: 105,
    position: 'absolute',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: 60,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  subtitleText: {
    fontSize: 16,
  },
  allText: {
    width: Layout.window.width - 20 - 50, //subtracting margin and width of icon. Mandates wrapping
  },
});
