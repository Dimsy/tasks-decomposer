import { StoryIcon, ReleaseIcon, TaskIcon, BugIcon } from '../icons'
import { ItemType } from '../helpers'

interface IIconProps {
  type: ItemType
}

export const IconComponent = ({ type }: IIconProps) => {
  switch (type) {
    case ItemType.RELEASE:
      return <ReleaseIcon />
    case ItemType.STORY:
      return <StoryIcon />
    case ItemType.TASK:
      return <TaskIcon />
    case ItemType.BUG:
      return <BugIcon />
    default:
      console.log('No idea with:', type)
      return <></>
  }
}
