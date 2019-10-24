import React, { Component } from "react"
import { Input, Menu, Image } from "semantic-ui-react"

export default class Navbar extends Component {
	state = { activeItem: "home" }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu posiion='left'>
				<Menu.Item
					color='blue'
					name='HOME'
					active={activeItem === "HOME"}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					color='orange'
					name='SCORES'
					active={activeItem === "SCORES"}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					color='blue'
					name='ATTENDANCE'
					active={activeItem === "ATTENDANCE"}
					onClick={this.handleItemClick}
				/>

				<Menu.Menu position='right'>
					<Menu.Item color='orange'>
						<Image src='/images/wireframe/square-image.png' avatar />
						<span>USERNAME</span>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		)
	}
}
