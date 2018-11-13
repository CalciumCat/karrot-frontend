import i18n from '@/base/i18n'

function getMessageParams (type, context) {
  const commonParams = {
    userName: context.user && context.user.displayName,
  }

  switch (type) {
    case 'new_applicant':
      return {
        userName: context.application && context.application.user.displayName,
      }
    case 'feedback_possible':
      return {
        date: context.pickup && i18n.d(context.pickup.date, 'dayAndTime'),
      }
    case 'pickup_upcoming':
      return {
        time: context.pickup && i18n.d(context.pickup.date, 'timeShort'),
      }
    case 'new_place':
      return {
        placeName: context.place && context.place.name,
      }
  }

  return commonParams
}

function getIcon (type, context) {
  switch (type) {
    case 'application_accepted':
      return 'fas fa-check'
    case 'application_declined':
      return 'fas fa-times'
    case 'invitation_accepted':
    case 'new_member':
      return 'fas fa-user-plus'
    case 'feedback_possible':
      return 'fas fa-balance-scale'
    case 'pickup_upcoming':
      return 'fas fa-calendar-alt'
    case 'new_place':
      return 'fas fa-shopping-cart'
    case 'new_applicant':
      return 'fas fa-address-card'
    case 'user_became_editor':
    case 'you_became_editor':
      return 'fas fa-angle-double-up'
  }
}

function getRouteTo (type, context) {
  switch (type) {
    case 'user_became_editor':
    case 'invitation_accepted':
    case 'new_member':
      return context.user && { name: 'user', params: { userId: context.user.id } }
    case 'you_became_editor': // TODO show information about editing permissions
    case 'application_accepted':
      return context.group && { name: 'group', params: { groupId: context.group.id } }
    case 'new_applicant':
      return context.group && { name: 'groupApplications', params: { groupId: context.group.id } }
    case 'feedback_possible':
      return context.pickup && context.group && { name: 'giveFeedback', params: { groupId: context.group.id, pickupId: context.pickup.id } }
    case 'application_declined':
      return context.group && { name: 'groupPreview', params: { groupPreviewId: context.group.id } }
    case 'new_place':
    case 'pickup_upcoming':
      return context.place && context.group && { name: 'place', params: { groupId: context.group.id, placeId: context.place.id } }
  }
}

function getKey (type) {
  if (type === 'new_place') type = 'new_store'
  return `NOTIFICATION_BELLS.${type.toUpperCase()}`
}

export default function getConfig (type, context) {
  const config = {
    message: i18n.t(getKey(type), getMessageParams(type, context)),
    icon: getIcon(type, context),
    routeTo: getRouteTo(type, context),
  }

  return config
}
