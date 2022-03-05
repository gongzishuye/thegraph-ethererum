import { Transfer } from '../generated/Mana/Mana'
import { TokenHolder } from '../generated/schema'


export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHex()
  let to = event.params.to.toHex()
  
  let holderFrom = TokenHolder.load(from)
  if (holderFrom == null) {
    holderFrom = new TokenHolder(from)
  }
  
  let holderTo = TokenHolder.load(to)
  if (holderTo == null) {
    holderTo = new TokenHolder(to)
  }
  
  holderFrom.amount = holderFrom.amount - event.params.value
  holderTo.amount = holderTo.amount + event.params.value
  
  holderFrom.save()
  holderTo.save()
}
