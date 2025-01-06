<template>
    <ion-page>
        <ion-app>
            <ion-split-pane content-id="main-content">
                <SideMenu />

                <div class="ion-page" id="main-content">
                    <ion-header>
                        <ion-toolbar>
                            <ion-buttons slot="start">
                                <ion-menu-button></ion-menu-button>
                            </ion-buttons>
                            <ion-title>Messages</ion-title>
                        </ion-toolbar>
                    </ion-header>

                    <ion-content>
                        <!-- Student Info Card -->
                        <div class="leave-container">
                            <div v-if="totaluserListId && totaluserListId.rows">
                                <ion-list>
                                    <ion-item-sliding v-for="message in totaluserListId.rows" :key="message.id">
                                        <ion-item>
                                            <ion-avatar slot="start">
                                                <img src="https://static.vecteezy.com/system/resources/thumbnails/042/714/998/small/3d-illustration-real-estate-real-estate-agent-male-png.png"
                                                    alt="Student" />
                                            </ion-avatar>
                                            <ion-label>
                                                <h2 v-if="message.createdBy && message.createdBy.id === parseInt(userId1)">
                                                    Sent to: {{ message.admin?.role?.roletype }} - {{ message.admin?.username
                                                    }}
                                                </h2>
                                                <h2 v-else-if="message.user && message.user.id === parseInt(userId1)">
                                                    Received From: {{ message.createdBy?.role?.roletype }} - {{
                                                        message.createdBy?.username }}
                                                </h2>
                                                <p>{{ message.message }}</p>
                                            </ion-label>
                                        </ion-item>

                                        <ion-item-options side="start">
                                            <ion-item-option color="primary" @click="openUpdateModal(message.id)">
                                                <ion-icon :icon="createOutline"></ion-icon>
                                                Edit
                                            </ion-item-option>
                                        </ion-item-options>

                                        <ion-item-options side="end">
                                            <ion-item-option color="danger" @click="handledelete(message)">
                                                <ion-icon :icon="trash"></ion-icon>
                                                Delete
                                            </ion-item-option>
                                        </ion-item-options>
                                    </ion-item-sliding>
                                </ion-list>
                            </div>
                        </div>


                        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                            <ion-fab-button class="add" @click="openAddLeaveModal">
                                <ion-icon :icon="addOutline" class="icon"></ion-icon>
                            </ion-fab-button>
                        </ion-fab>

                        <ion-modal :isOpen="showModal" @didDismiss="showModal = false" class="modal">
                            <ion-header>
                                <ion-toolbar>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col size="auto">
                                                <ion-button class="back" fill="clear" @click="showModal = false">
                                                    <ion-icon :icon="chevronBackOutline"></ion-icon>
                                                </ion-button>
                                            </ion-col>

                                        </ion-row>
                                    </ion-grid>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content>
                                <div class="form">
                                    <br />
                                    <ion-row>
                                        <ion-col>
                                            <ion-select v-model="userId" placeholder="Select admin">
                                                <ion-select-option v-for="user in totaladminList" :key="user.id"
                                                    :value="user.id">
                                                    {{ user.username }} ({{ user.role?.roletype }})
                                                </ion-select-option>
                                            </ion-select>
                                        </ion-col>
                                    </ion-row>
                                    <ion-input v-model="userId1" ref="input" type="hidden"></ion-input>
                                    <ion-textarea v-model="message" ref="input" type="text" placeholder="Message"
                                        fill="outline" auto-grow rows="10"></ion-textarea>
                                    <br />
                                </div>
                                <ion-button expand="block" class="save" @click="addLeave">Sent</ion-button>
                            </ion-content>
                        </ion-modal>

                        <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="modal">
                            <ion-header>
                                <ion-toolbar>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col size="auto">
                                                <ion-button class="back" fill="clear" @click="showUpdate = false">
                                                    <ion-icon :icon="chevronBackOutline"></ion-icon>
                                                </ion-button>
                                            </ion-col>

                                        </ion-row>
                                    </ion-grid>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content>
                                <div class="form">
                                    <br />
                                    <ion-row>
                                        <ion-col>
                                            <ion-select v-model="userId" placeholder="Select user"
                                                :disabled="isReadonly">
                                                <ion-select-option v-for="user in totaladminList" :key="user.id"
                                                    :value="user.id">
                                                    {{ user.username }} ({{ user.role?.roletype }})
                                                </ion-select-option>
                                            </ion-select>
                                        </ion-col>
                                    </ion-row>
                                    <ion-textarea v-model="message" ref="input" type="text" placeholder="Message"
                                        fill="outline" auto-grow rows="10"></ion-textarea>
                                    <br />
                                </div>
                                <ion-button expand="block" class="save" @click="updateLead">Save</ion-button>
                            </ion-content>
                        </ion-modal>

                        <ion-modal :is-open="showDelete" @didDismiss="closeDeleteDialog" class="modal2">
                            <ion-header>
                                <ion-toolbar>
                                    <ion-title>Confirm Delete</ion-title>
                                    <ion-buttons slot="end">
                                        <ion-button @click="closeDeleteDialog">Close</ion-button>
                                    </ion-buttons>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                                <p>Are you sure you want to delete this info?</p>
                                <ion-row>
                                    <ion-col>
                                        <ion-button color="danger" expand="block" @click="confirmdelete">Yes,
                                            Delete</ion-button>
                                    </ion-col>
                                    <ion-col>
                                        <ion-button color="primary" expand="block"
                                            @click="closeDeleteDialog">Cancel</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-content>
                        </ion-modal>

                    </ion-content>
                </div>
            </ion-split-pane>
        </ion-app>
    </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapActions, mapState } from 'vuex';
import {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonAvatar, IonCard, IonCardContent, IonPage, IonInput,
    IonModal, IonSelect, IonSelectOption, IonFab, IonFabButton, IonItemSliding,
    IonItemOptions, IonLabel, IonItem, IonList,
    IonItemOption, IonTextarea,
    IonBadge,
    IonRefresher,
    IonRefresherContent

} from '@ionic/vue';
import {
    addOutline, chevronBackOutline, createOutline, trash, personOutline,
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';


export default defineComponent({
    name: 'FollowupDetails',
    components: {
        IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
        IonButtons, IonMenuButton, IonButton, IonIcon,
        IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
        IonAvatar, IonCard, IonCardContent, SideMenu, IonPage, IonInput,
        IonModal, IonSelect, IonSelectOption, IonFab, IonFabButton, IonItemSliding,
        IonItemOptions, IonLabel, IonItem, IonList,
        IonItemOption, IonBadge,
        IonRefresher, IonTextarea,
        IonRefresherContent
    },
    data() {
        return {
            message: '',
            isReadonly: true,
            addOutline,
            chevronBackOutline,
            trash,
            personOutline,
            createOutline,
            showModal: false,
            userId: null,
            userId1: null,
            showUpdate: false,
            currentleaveId: null,
            deleteItem: {},
            showDelete: false,
        };
    },
    computed: {
        ...mapState('message', ['totaluserListId',]),
        ...mapState('user', ['totaladminList',]),

    },
    methods: {
        ...mapActions('message', ['fetchtotaluserlistId', 'ADD_MESSAGE', 'update_message', 'delete_message']),
        ...mapActions('user', ['fetchtotaladminlist']),
    
        resetAddLeaveForm() {
            this.message = '';
            this.userId = null;
        },
        openAddLeaveModal() {
            this.resetAddLeaveForm();
            this.showModal = true;
        },

        handledelete(message) {
            this.opendeleteDialog(message);
        },
        opendeleteDialog(message) {
            this.deleteItem = message;
            this.showDelete = true;
        },
        closeDeleteDialog() {
            this.showDelete = false;
            this.deleteItem = {};
        },

        async addLeave() {
            // console.log('addReminder method called');
            // console.log('reminder name:', this.name);
            // console.log('reminder amount:', this.amount);
            // console.log('payment status:', this.paymentStatusId);

            const payload = {
                message: this.message,
                adminId: this.userId,
                createdById: this.userId1
            };

            console.log('Payload:', payload);

            try {
                await this.ADD_MESSAGE(payload);
                // console.log('addReminder saved successfully');
                this.showModal = false;
                await this.fetchleadData();
            } catch (error) {
                console.error('Error adding:', error);
                this.errorMessage = 'Failed to create leave. Please try again.';
            }
        },
        async openUpdateModal(leaveId) {
            console.log('Opening modal for lead ID:', leaveId);
            try {
                const leadData = await this.totaluserListId.rows.find((message) => message.id === leaveId);

                if (leadData) {
                    this.message = leadData.message;
                    this.userId = leadData.adminId;
                    this.currentleaveId = leaveId;
                    this.showUpdate = true;
                } else {
                    console.error('No lead found with ID:', leadId);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async updateLead() {

            // console.log('leadId:', this.currentleadId)

            const payload = {
                id: this.currentleaveId,
                message: this.message,
                adminId: this.userId,

            };

            try {
                await this.update_message(payload);
                console.log('leave updated successfully');
                this.showUpdate = false;
                await this.fetchleadData();

            } catch (error) {
                console.error('Error updating leave:', error);
            }
        },
        confirmdelete() {
            if (this.deleteItem.hasOwnProperty('id')) {
                this.delete_message(this.deleteItem)
                    .then(() => {
                        console.log('leave deleted successfully');
                        this.closeDeleteDialog();
                        this.fetchleadData();
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                    });
            } else {
                console.error('Unable to delete: id property not found');
            }
        },
        async fetchleadData() {
            const userId = this.$route.params.id;
            try {
                await this.fetchtotaladminlist();
                await this.fetchtotaluserlistId(userId);

                // console.log("Leads fetched successfully:", this.totalfollowupListId);
            } catch (error) {
                console.error('Error fetching lead data:', error);
            }
        },
    },
    async mounted() {
        try {
            this.userId1 = this.$route.params.id;
            console.log('User ID:', this.userId1);
            await this.fetchleadData();
        } catch (error) {
            console.error('Error fetching project list:', error);
        }
    }
});
</script>

<style>
.notification-badge {
    position: absolute;
    top: 7px;
    right: 9px;
    background: red;
    color: white;
    font-size: 9px;
    border-radius: 50%;
    padding: 3px 5px;
    z-index: 10;
}

.leave-container {
    padding: 16px;
    max-width: 800px;
    margin: 0 auto;

    border-radius: 8px;

}

/* General Modal Styles */
ion-modal {
    --background: #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Modal Header */
ion-header {
    --background: #6200ea;
    --color: white;
    padding: 0;
}






/* Form Styling */
.form {
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form ion-input,
.form ion-select {
    margin-bottom: 1rem;
    --background: #fff;
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
    --padding-start: 12px;
}

ion-input {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
}

ion-select {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    --padding-start: 12px;
}

ion-select-option {
    padding: 0.75rem;
    font-size: 1rem;
}





.back:hover {
    transform: scale(1.1);
}

/* Responsiveness */
@media (max-width: 768px) {
    ion-title {
        font-size: 1rem;
    }

    .form {
        padding: 0.75rem;
    }

    ion-button {
        font-size: 0.9rem;
    }
}
</style>