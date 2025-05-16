// GERAL.JS: ARMAZENA ESTILOS DE COMPONENTES PADRÃO

import metrics from './metrics';
import colors from './colors';
import fonts from './fonts';

const general = {
  tabBar: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  container2: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container3: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  section: {
    margin: metrics.doubleBaseMargin,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: fonts.regular,
    alignSelf: 'center',
    marginBottom: metrics.doubleBaseMargin,
  },
};

export default general;
