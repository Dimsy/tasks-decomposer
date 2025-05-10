import { IconComponent } from './IconComponent'

enum ItemType {
  RELEASE = 'RELEASE',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
}

enum SpecType {
  ANALYSIS = 'Аналитика',
  FRONTEND = 'Фронтэнд',
  BACKEND = 'Бэкэнд',
  TEST = 'Тестирование',
  DEVOPS = 'Dev-Ops',
}

const getStyleByType = (specType: SpecType) => {
  switch (specType) {
    case SpecType.ANALYSIS:
      return { backgroundColor: 'rgb(252, 227, 214)', borderColor: 'rgba(255, 192, 159, 0.5)' }
    case SpecType.FRONTEND:
      return { backgroundColor: 'rgb(189, 248, 220)', borderColor: 'rgba(73, 160, 120, 0.5)' }
    case SpecType.BACKEND:
      return { backgroundColor: 'rgb(198, 238, 245)', borderColor: 'rgba(94, 177, 191, 0.5)' }
    case SpecType.TEST:
      return { backgroundColor: 'rgb(250, 224, 189)', borderColor: 'rgba(244, 172, 69, 0.5)' }
    default:
      return { backgroundColor: 'white', borderColor: 'lightGray' }
  }
}

export { ItemType, SpecType, getStyleByType, IconComponent }
