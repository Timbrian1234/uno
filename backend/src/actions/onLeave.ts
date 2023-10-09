import { Client } from "colyseus"
import { Player, PlayerClass } from "common"
import { MyRoom } from "@typings/room"
import { updateMetadata } from "@helpers/updateMetadata"

export default async function onLeave(this: MyRoom, client: Client<Player>) {
  let player = this.state.players.get(String(client.userData.id))
  if (player) {
    if (this.state.status !== "playing")
      this.state.players.delete(String(client.userData.id))
    else {
      player.status = "offline"
      this.state.players.set(String(client.userData.id), player)
    }
  }

  this.state.visitors.delete(String(client.userData.id))

  updateMetadata(this)

  if (!player) {
    if (!this.state.players.size && !this.state.visitors.size)
      await this.disconnect()

    return
  }

  try {
    const reconnection = this.allowReconnection(client, "manual")

    await reconnection

    player = this.state.players.get(String(client.userData.id))
    if (player) {
      player.status = "online"
      this.state.players.set(String(client.userData.id), player)

      const visitor = new PlayerClass()
      visitor.id = client.userData.id
      visitor.name = client.userData.name
      visitor.language = client.userData.language

      this.state.visitors.set(String(client.userData.id), visitor)
    } else reconnection.reject()

    updateMetadata(this)
  } catch (e) {
    console.log("onLeave error: ", e, client.userData)

    if (this.state.players.size === 0) await this.disconnect()
    else updateMetadata(this)
  }
}
