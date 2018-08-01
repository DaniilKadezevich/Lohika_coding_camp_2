class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :firstName, :lastName, :avatar, :list_id
end
