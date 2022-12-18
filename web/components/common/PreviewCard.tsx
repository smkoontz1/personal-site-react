import { Card } from 'react-bootstrap'
import styles from '../../styles/common/PreviewCard.module.scss'

interface Props {
  cardImage?: JSX.Element
  cardBody: JSX.Element
}

export default function PreviewCard(props: Props) {
  const { cardImage, cardBody } = props
  
  return (
    <div className={styles.previewCardShell}>
      <Card bg='light'>
        {cardImage}
        {cardBody}
      </Card>
    </div>
  )
}