class MV {
    constructor() {
      this.ami_launch_index = 0;
      this.architecture = '';
      this.block_device_mappings = [];
      this.boot_mode = '';
      this.capacity_reservation_id = null;
      this.capacity_reservation_specification = {};
      this.classic_address = null;
      this.client_token = '';
      this.cpu_options = {};
      this.current_instance_boot_mode = '';
      this.ebs_optimized = false;
      this.elastic_gpu_associations = null;
      this.elastic_inference_accelerator_associations = null;
      this.ena_support = false;
      this.enclave_options = {};
      this.hibernation_options = {};
      this.hypervisor = '';
      this.iam_instance_profile = null;
      this.id = '';
      this.image = null;
      this.image_id = '';
      this.instance_id = '';
      this.instance_lifecycle = null;
      this.instance_type = '';
      this.ipv6_address = null;
      this.kernel_id = null;
      this.key_name = null;
      this.key_pair = null;
      this.launch_time = null;
      this.licenses = null;
      this.maintenance_options = {};
      this.meta = {};
      this.metadata_options = {};
      this.monitoring = {};
      this.network_interfaces = [];
      this.network_interfaces_attribute = [];
      this.outpost_arn = null;
      this.placement = {};
      this.placement_group = null;
      this.platform = null;
      this.platform_details = '';
      this.private_dns_name = '';
      this.private_dns_name_options = {};
      this.private_ip_address = '';
      this.product_codes = [];
      this.public_ip_address = '';
      this.root_device_name = '';
      this.root_device_type = '';
      this.security_groups = [];
      this.spot_instance_request_id = null;
      this.sriov_net_support = null;
      this.state = {};
      this.state_reason = null;
      this.state_transition_reason = '';
      this.subnet = null;
      this.subnet_id = '';
      this.tags = null;
      this.tpm_support = null;
      this.usage_operation = '';
      this.usage_operation_update_time = null;
      this.virtualization_type = '';
      this.volumes = {};
      this.vpc = null;
      this.vpc_addresses = {};
      this.vpc_id = '';
    }
  
    AsignarValor(mensaje){
        try {
            let indice = mensaje.indexOf(":")
            let nombre = mensaje.substring(0,indice)
            let valor = mensaje.substring(indice+1)
            if (this.hasOwnProperty(nombre)) {
                this[nombre] = valor.replace(/\s/g, '');
            }
        } catch (error) {
            console.error('Error al asignar valores desde la cadena:', error);
        }
    }
  }