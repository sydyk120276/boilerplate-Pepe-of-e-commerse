import React from 'react'
import { useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge)

export default function CustomizedBadges() {
  const { totalAmount } = useSelector((s) => s.cart)

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={totalAmount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  )
}
