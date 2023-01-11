<script lang="ts" setup>
import { VNodeRef } from 'vue';
import users from '~/assets/data/users.json';

definePageMeta({
  layout: 'empty'
});

const primaryColor = '#284e68';
const userDefault = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  gender: 1,
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
};

const columns = [
  { key: 'id' },
  { key: 'name' },
  { key: 'username' },
  { key: 'email' },
  { key: 'phone' },
  { key: 'website' },
  { key: 'company.name', label: 'company' },
  { key: 'actions', label: ' ', width: 80 }
];

const isShowModal = ref(false);
const user = ref(userDefault);
const isEdit = computed(() => !!user.value.id);
const formRef = ref<VNodeRef | null>(null);
const requiredRule = [(value) => !!value || 'This field is required'];

function openModal(index?: number) {
  user.value = index !== undefined ? users[index] : userDefault;
  isShowModal.value = true;
}
function closeModal() {
  isShowModal.value = false;
}

function handleAddOrEditUser() {
  const isValid = formRef.value.validate();
  if (isValid) {
    console.log('User:::', user);
    closeModal();
  }
}
</script>

<template>
  <div class="vuestic-example pa-5">
    <p class="heading va-title pl-3 pb-2">USERS</p>
    <va-button
      :color="primaryColor"
      class="button mb-3 -add"
      @click="openModal()"
    >
      ADD USER
    </va-button>
    <va-data-table class="table" :items="users" :columns="columns">
      <template #cell(actions)="{ rowIndex }">
        <va-button
          preset="plain"
          icon="edit"
          :color="primaryColor"
          @click="openModal(rowIndex)"
        />
        <va-button preset="plain" icon="delete" :color="primaryColor" />
      </template>
    </va-data-table>

    <va-modal
      class="modal-edit-user"
      :model-value="isShowModal"
      size="large"
      background-color="#f9f9f7"
      hide-default-actions
      :mobile-fullscreen="false"
    >
      <template #header>
        {{ isEdit ? 'Edit User' : 'Add User' }}
      </template>
      <va-form ref="formRef" class="form">
        <div class="group -name">
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input
                  class="input"
                  v-model="user.name"
                  :rules="requiredRule"
                >
                  <template #prepend>
                    <label class="label">Name</label>
                  </template>
                </va-input>
              </div>
            </div>
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input
                  class="input"
                  v-model="user.username"
                  :rules="requiredRule"
                >
                  <template #prepend>
                    <label class="label">Username</label>
                  </template>
                </va-input>
              </div>
            </div>
          </div>
        </div>
        <h3 class="title my-3">Detail</h3>
        <div class="group">
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input
                  color="#fff"
                  class="input"
                  v-model="user.email"
                  :rules="requiredRule"
                >
                  <template #prepend>
                    <label class="label">Email</label>
                  </template>
                  <template #append> A </template>
                </va-input>
              </div>
            </div>
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input
                  class="input"
                  v-model="user.phone"
                  :rules="requiredRule"
                >
                  <template #prepend>
                    <label class="label">Phone</label>
                  </template>
                  <template #append> B </template>
                </va-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input
                  class="input"
                  v-model="user.address"
                  :rules="requiredRule"
                >
                  <template #prepend>
                    <label class="label">Address</label>
                  </template>
                  <template #append> C </template>
                </va-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content d-flex align-center">
                <label class="label">Gender</label>
                <div class="gender">
                  <va-radio
                    :option="1"
                    label="Male"
                    :color="primaryColor"
                    v-model="user.gender"
                  />
                  <va-radio
                    :option="0"
                    label="Female"
                    :color="primaryColor"
                    v-model="user.gender"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 class="title my-3">Company</h3>
        <div class="group">
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input class="input" v-model="user.company.name">
                  <template #prepend>
                    <label class="label">Name</label>
                  </template>
                  <template #append> D </template>
                </va-input>
              </div>
            </div>
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input class="input" v-model="user.company.catchPhrase">
                  <template #prepend>
                    <label class="label">Catch phrase</label>
                  </template>
                  <template #append> E </template>
                </va-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="field flex xs12 md5">
              <div class="content">
                <va-input class="input" v-model="user.company.bs">
                  <template #prepend>
                    <label class="label">BS</label>
                  </template>
                  <template #append> F </template>
                </va-input>
              </div>
            </div>
          </div>
        </div>
      </va-form>
      <template #footer>
        <va-button color="#ccc" class="mr-3" @click="closeModal">
          CANCEL
        </va-button>
        <va-button :color="primaryColor" @click="handleAddOrEditUser">
          {{ isEdit ? 'SAVE' : 'ADD' }}
        </va-button>
      </template>
    </va-modal>
  </div>
</template>

<style scoped lang="scss">
$primaryColor: v-bind(primaryColor);
.vuestic-example {
  min-height: 100vh;
  background-color: #f9f9f7;
  > .heading {
    font-size: 1.25rem;
    border-left: 3px solid $primaryColor;
    border-bottom: 1px solid $primaryColor;
    margin-bottom: 12px;
  }
  > .button.-add {
    --va-button-size: 1.25rem;
    --va-button-font-weight: 500;
    --va-button-content-px: 1rem;
    --va-button-content-py: 0.35rem;
    --va-button-border-radius: 0.5rem;
    float: right;
  }
  > .table {
    --va-data-table-thead-border: 1px solid $primaryColor;
    --va-data-table-thead-font-size: 1rem;
    --va-data-table-thead-font-weight: 500;
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
  }
  > .table
    :deep(
      .va-data-table__table-tbody > .va-data-table__table-tr:not(:last-child)
    ) {
    border-bottom: 1px solid #284e6880;
  }
  :global(
      .modal-edit-user
        > .va-modal__container
        > .va-modal__dialog
        > .va-modal__inner
        > .va-modal__header
    ) {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.25rem;
  }
}
:deep(.group) {
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  > .row {
    row-gap: 1rem;
    @include sm-and-above {
      column-gap: 5rem;
    }
  }
  > .row + .row {
    margin-top: 1rem;
  }
  > .row > .field > .content > .label {
    width: calc(6rem + 6px);
  }
  > .row > .field > .content > .input {
    &:not(.va-input-wrapper--error) {
      --va-input-wrapper-background: #fff;
      --va-input-wrapper-border-color: rgba(40, 78, 104, 0.5);
    }
    > .va-input-wrapper__container > .va-input-wrapper__prepend-inner {
      width: 6rem;
      justify-content: flex-start;
    }
    > .va-message-list {
      margin-left: calc(6rem + 6px);
    }
  }
  &.-name > .row > .field > .content > .input > .va-input-wrapper__container {
    @include sm-and-above {
      width: calc(100% - 15px);
    }
  }
}
</style>
