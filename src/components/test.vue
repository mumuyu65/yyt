<ul class="nav nav-second-level collapse in" v-if="!item.noDropdown">
            <li v-for="subItem in item.children">
                <router-link  :to="subItem.path" exact>基础课件</router-link>
            </li>
        </ul>