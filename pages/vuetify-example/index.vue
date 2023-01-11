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

const isShowModal = ref(false);
const user = ref(userDefault);
const isEdit = computed(() => !!user.value.id);
const formRef = ref<VNodeRef | null>(null);
const requiredRule = [(value) => !!value || 'This field is required'];
const validForm = ref(true);

function openModal(selectedUser?: any) {
  user.value = selectedUser !== undefined ? selectedUser : userDefault;
  isShowModal.value = true;
}
function closeModal() {
  isShowModal.value = false;
}
async function handleAddOrEditUser() {
  const { valid } = await formRef.value.validate();
  if (valid) {
    console.log('User:::', user);
    closeModal();
  }
}
</script>

<template>
  <div class="vuetify-example pa-5">
    <p class="heading text-h6 font-weight-bold pl-3 pb-2">USERS</p>
    <v-btn
      size="small"
      :color="primaryColor"
      rounded="lg"
      class="button text-white float-right mb-3 -add"
      @click="openModal()"
    >
      ADD USER
    </v-btn>
    <v-table density="comfortable" class="table w-100">
      <thead class="thead text-left">
        <tr class="row">
          <th class="col">ID</th>
          <th class="col">Name</th>
          <th class="col">Username</th>
          <th class="col">Email</th>
          <th class="col">Phone</th>
          <th class="col">Website</th>
          <th class="col">Company</th>
          <th class="col" width="80"></th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="row" v-for="user in users" :key="user.id">
          <td class="col">{{ user.id }}</td>
          <td class="col">{{ user.name }}</td>
          <td class="col">{{ user.username }}</td>
          <td class="col">{{ user.email }}</td>
          <td class="col">{{ user.phone }}</td>
          <td class="col">{{ user.website }}</td>
          <td class="col">{{ user.company.name }}</td>
          <td class="col">
            <div class="d-flex">
              <v-icon
                small
                :color="primaryColor"
                class="mr-2"
                @click.stop="openModal(user)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small :color="primaryColor"> mdi-delete </v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="isShowModal" max-width="992" class="modal-edit-user">
      <v-form v-model="validForm" ref="formRef" class="form">
        <v-card>
          <v-card-title class="text-h6">
            {{ isEdit ? 'Edit User' : 'Add User' }}
          </v-card-title>
          <v-card-text>
            <v-container fluid class="py-0">
              <v-row class="group my-0 pa-1 bg-white -name">
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.name"
                    :rules="requiredRule"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Name</label>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.username"
                    :rules="requiredRule"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Username</label>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <h3 class="title my-3">Detail</h3>
              <v-row class="group my-0 pa-1 bg-white">
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.email"
                    :rules="requiredRule"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Email</label>
                    </template>
                    <template #append> A </template>
                  </v-text-field>
                </v-col>
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.phone"
                    :rules="requiredRule"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Phone</label>
                    </template>
                    <template #append> B </template>
                  </v-text-field>
                </v-col>
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.address"
                    :rules="requiredRule"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Address</label>
                    </template>
                    <template #append> C </template>
                  </v-text-field>
                </v-col>
                <v-col class="field" cols="12">
                  <v-radio-group
                    v-model="user.gender"
                    inline
                    hide-details="auto"
                    :color="primaryColor"
                    class="input align-center -gender"
                  >
                    <template #prepend>
                      <label class="label">Gender</label>
                    </template>
                    <v-radio label="Male" :value="1"></v-radio>
                    <v-radio label="Female" :value="0"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <h3 class="title my-3">Company</h3>
              <v-row class="group my-0 pa-1 bg-white">
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.company.name"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Name</label>
                    </template>
                    <template #append> D </template>
                  </v-text-field>
                </v-col>
                <v-col class="field align-center" cols="12" sm="5">
                  <v-text-field
                    v-model="user.company.catchPhrase"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">Catch phrase</label>
                    </template>
                    <template #append> E </template>
                  </v-text-field>
                </v-col>
                <v-col class="field" cols="12" sm="5">
                  <v-text-field
                    v-model="user.company.bs"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    class="input"
                  >
                    <template #prepend>
                      <label class="label">BS</label>
                    </template>
                    <template #append> F </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="actions d-flex justify-center pb-3">
            <v-btn variant="tonal" class="button mr-3" @click="closeModal">
              CANCEL
            </v-btn>
            <v-btn
              :color="primaryColor"
              variant="elevated"
              class="button -submit"
              @click="handleAddOrEditUser"
            >
              {{ isEdit ? 'SAVE' : 'ADD' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
$primaryColor: v-bind(primaryColor);
.vuetify-example {
  min-height: 100vh;
  background-color: #f9f9f7;
  > .heading {
    border-left: 3px solid $primaryColor;
    border-bottom: 1px solid $primaryColor;
    margin-bottom: 12px;
  }
  > .button.-add {
    --va-button-border-radius: 0.5rem;
  }
  > .table {
    --v-border-color: 40, 78, 104;
    --v-border-opacity: 0.502;
    clear: right;
    border-radius: 20px;
  }
  > .table > .v-table__wrapper > table > .thead > .row > th.col {
    color: rgba(0, 0, 0, 0.87);
    text-transform: uppercase;
    border-bottom: 1px solid $primaryColor;
  }
}
.modal-edit-user {
  > .v-overlay__content > .form > .v-card {
    --v-theme-surface: 249, 249, 247;
  }
  > .v-overlay__content
    > .form
    > .v-card
    > .v-card-text
    > .v-container
    > .group {
    border-radius: 10px;
    column-gap: 5rem;
    > .field > .input > :deep(.v-input__prepend) {
      width: 6rem;
      margin-inline-end: 6px;
      > .label {
        font-size: 14px;
      }
    }
    > .field > .input.-gender > :deep(.v-input__prepend) {
      padding-top: 0;
    }
    &.-name > .field > .input :deep(.v-input__control) {
      width: calc(100% - 26px);
    }
  }

  > .v-overlay__content > .form > .v-card > .actions > .button.-submit {
    --v-theme-on-surface: 255, 255, 255;
  }
}
</style>
